"""Launch regression tests. All fixtures stay in temporary directories."""
import hashlib
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class LaunchTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name) / 'kit'
        shutil.copytree(ROOT, self.root, ignore=shutil.ignore_patterns('.git', '__pycache__', 'node_modules', 'public', '.openai'))

    def run_launch(self, *extra):
        return subprocess.run(['bash', 'scripts/go_live.sh', 'N-i-k-e-t', 'foa-agents',
                               'security@fixture.test', 'conduct@fixture.test', *extra],
                              cwd=self.root, capture_output=True, text=True)

    def state(self):
        return {str(p.relative_to(self.root)): hashlib.sha256(p.read_bytes()).hexdigest()
                for p in self.root.rglob('*') if p.is_file()}

    def test_dry_run_has_no_side_effects(self):
        before = self.state()
        result = self.run_launch('--dry-run')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(before, self.state())
        self.assertFalse((self.root / '.git').exists())

    def test_nested_env_blocked(self):
        (self.root / 'data' / '.env.production').write_text('NOT_A_KEY=fixture')
        result = self.run_launch('--dry-run')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('environment file', result.stderr)

    def test_credential_blocked_without_disclosure(self):
        token = 'ghp_' + 'x' * 36
        (self.root / 'data' / 'bad.txt').write_text(token)
        result = self.run_launch('--dry-run')
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn(token, result.stdout + result.stderr)

    def test_nonempty_example_blocked(self):
        (self.root / '.env.example').write_text('SAMPLE_KEY=fixture')
        self.assertNotEqual(self.run_launch('--dry-run').returncode, 0)

    def test_placeholders_rejected(self):
        result = subprocess.run(['python3', 'scripts/launch_preflight.py', '<OWNER>',
                                 'foa-agents', '<EMAIL>', '<EMAIL>'], cwd=self.root,
                                capture_output=True)
        self.assertNotEqual(result.returncode, 0)

    def test_literal_render_and_personal_codeowner(self):
        # Exercise template rendering even after the real kit has been configured.
        (self.root / 'SECURITY.md').write_text('Report by email {{SECURITY_EMAIL}}.\n')
        (self.root / '.github' / 'CODEOWNERS').write_text('* @{{ORG}}/core\n')
        subprocess.run(['python3', 'scripts/launch_preflight.py', 'N-i-k-e-t',
                        'foa-agents', 'security@fixture.test', 'conduct@fixture.test', '--render'],
                       cwd=self.root, check=True, capture_output=True)
        self.assertIn('email security@fixture.test', (self.root / 'SECURITY.md').read_text())
        self.assertIn('@N-i-k-e-t', (self.root / '.github' / 'CODEOWNERS').read_text())
        self.assertNotIn('@N-i-k-e-t/core', (self.root / '.github' / 'CODEOWNERS').read_text())
        self.assertIn('${{ secrets.GITHUB_TOKEN }}', (self.root / '.github/workflows/site.yml').read_text())


if __name__ == '__main__':
    unittest.main()
