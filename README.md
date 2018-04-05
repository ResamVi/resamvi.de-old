## Notes to keep in mind
Any references to any other source files (e.g. `<style src="style.css">`) do not follow the structure as is presented in `src/` folder. These are side-effects of trying to use webpack as task runner.

Refer to `webpack.config.js` to see more details of the finished structure in `build/`:

- html files are emitted to the root of `build/`
- Any javascript that needs to be run can be imported via `<style src="script.js">`
- In the same man any style declarations are bundled in `style.css` and available in root of `build/` as well 
- images in `img/` (no subfolders)