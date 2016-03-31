from __future__ import absolute_import
import platform
from . import config

os_windows = platform.system() == 'Windows'

if os_windows and not config.batch_mode:
    from . import ipystata_magic
else:
    from . import ipystata_magic_batch