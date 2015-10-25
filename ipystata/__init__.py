import sys
if sys.version_info > (3,):
	from . import ipystata_magic
else:
	import ipystata_magic