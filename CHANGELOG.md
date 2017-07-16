# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.8.0] - 2017-07-20
### Added
- MIT License.
- Change log.
- Add PHPUnit to docker web container.
- Add new folder maps to /var/tmp and /var/log

### Changed
- Mysql cli is now run in the docker web container and not needed on the docker host.
- Update README.md documentation.
- Directory variables are now suffixed with _DIR.
- The mysql cli in the web container is used for db imports.

### Removed
- Nothing.

## [0.7.0] - 2017-07-05
### Added
- Initial commit.

### Changed
- Nothing.

### Removed
- Nothing.