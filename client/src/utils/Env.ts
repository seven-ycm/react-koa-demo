export function getNodeEnv() {
    return process.env.NODE_ENV || "development";
}

export function getRunEnv() {
    console.log("getRunEnv: ", process.env.REACT_APP_ENV);
    return process.env.REACT_APP_ENV || "local";
}

export function getSubEnv() {
    console.log("getSubEnv: ", process.env.REACT_APP_ENV);
    return process.env.REACT_APP_ENV  === "local" ? "local" : "online";
}
