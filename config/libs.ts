var libs = {
    events: 'const events=require("events"); export default events',
    fs: 'const fs=require("fs"); export default fs;',
    path: 'const path=require("path"); export default path;',
    url: 'const url=require("url"); export default url;',
    http: 'const http=require("http"); export default http;',
    querystring: 'const querystring=require("querystring"); export default querystring;',
    electron: 'const electron=require("electron"); export default electron;'
}

export { libs };