module.exports = {
    apps: [
        {
            name: "project-managements",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
            },
        }
    ]
}