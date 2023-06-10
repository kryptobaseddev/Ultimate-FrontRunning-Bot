## [0.0.3] - 2023-06-09
### Added
- try-catch blocks around async operations to handle potential promise rejections.
- process-level event listener for unhandled promise rejections to catch any that might still occur.
- Check whether a transaction was successfully retrieved before attempting to process it.
- Only process transactions higher than MINVALUE. Transaction not found for tx: message will only be logged for those
- Adding comments for better code clarity.
## [0.0.2] - 2023-05-16
### Added
- Approval function in the erc20.js file for the approval of the token
- Update sellToken.js file to include the approval function and double allowance if less then sell amount
### Changed
### Deprecated
### Removed
### Fixed
### Security
## [0.0.1] - 2023-05-16
- Initial Commit for bot
- updates to TODO
- fix(content) updated env.example file contents
- Bumped version to 0.0.1
- update Approval function double allowance if less than 0
<!-- Links -->
[keep a changelog]: https://keepachangelog.com/en/1.0.0/
[semantic versioning]: https://semver.org/spec/v2.0.0.html
<!-- Versions -->
[unreleased]: https://github.com/Author/Repository/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/Author/Repository/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/Author/Repository/releases/tag/v0.0.1