const { getClient } = require('./command.js')

exports.command = 'export'
exports.describe = 'Export catalog and text data'
exports.builder = {
    entities: {
        alias: 'e',
        description: 'Which types of entities to fetch',
        type: 'array',
        choices: [
            'archives',
            'artifacts',
            'artifact-assets',
            'artifacts-external-resources',
            'authors',
            'collections',
            'dates',
            'dynasties',
            'external-resources',
            'genres',
            'inscriptions',
            'languages',
            'materials',
            'material-aspects',
            'material-colors',
            'periods',
            'proveniences',
            'publications',
            'regions',
            'rulers'
        ]
    }
}

exports.handler = async function (options) {
    if (options.entities[0] === 'dates') {
        options.auth = true
    }

    const client = await getClient(options)

    console.time('Export')
    return client
        .export(options.format, options.entities, options.outputFile, options.startPage, options.cookie)
        .then(entities => {
            console.timeEnd('Export')

            for (const { status, reason } of entities) {
                if (status === 'rejected') {
                    console.error(reason)
                }
            }
        })
}
