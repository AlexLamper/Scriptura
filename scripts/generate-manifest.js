const fs = require('fs');
const path = require('path');

const publicDataDir = path.join(__dirname, '../public/data');
const manifestPath = path.join(publicDataDir, 'manifest.json');

function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).map(name => {
        const fullPath = path.join(dir, name);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            return {
                name,
                type: 'dir',
                files: fs.readdirSync(fullPath).filter(f => f.endsWith('.json'))
            };
        } else {
            return {
                name,
                type: 'file'
            };
        }
    });
}

const manifest = {
    bibles: getFiles(path.join(publicDataDir, 'bibles')),
    commentaries: getFiles(path.join(publicDataDir, 'commentaries'))
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Manifest generated at', manifestPath);
