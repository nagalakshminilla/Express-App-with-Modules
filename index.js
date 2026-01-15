const express = require('express');
const os = require('os');
const dns = require('dns');
const { readDataFile } = require('./read.js');

const app = express();

const PORT = 3000;

app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

app.get('/readfile', (req, res) => {
    const fileContent = readDataFile();
    res.send(fileContent);
});

app.get('/systemdetails', (req, res) => {
    try {
        const platform = os.platform();
        const totalMemoryGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
        const freeMemoryGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
        const cpus = os.cpus();
        const cpuModel = cpus.length > 0 ? cpus[0].model : 'Unknown';

        const systemInfo = {
            platform: platform,
            totalMemory: `${totalMemoryGB} GB`,
            freeMemory: `${freeMemoryGB} GB`,
            cpuModel: cpuModel.trim(),
            architecture: os.arch(),
            hostname: os.hostname(),
            uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
            cpuCores: cpus.length
        };

        res.json(systemInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get system details' });
    }
});

app.get('/getip', (req, res) => {
    const hostname = 'masaischool.com';
    
    dns.lookup(hostname, (error, address, family) => {
        if (error) {
            return res.status(500).json({ 
                error: 'Failed to resolve IP address',
                message: error.message 
            });
        }
        
        res.json({
            hostname: hostname,
            ipAddress: address,
            ipVersion: `IPv${family}`
        });
    });
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Express Modules Assignment</h1>
        <p>Available routes:</p>
        <ul>
            <li><a href="/test">/test</a> - Test route</li>
            <li><a href="/readfile">/readfile</a> - Read Data.txt file</li>
            <li><a href="/systemdetails">/systemdetails</a> - Get system information</li>
            <li><a href="/getip">/getip</a> - Get IP of masaischool.com</li>
        </ul>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Test the routes:`);
    console.log(`1. http://localhost:${PORT}/test`);
    console.log(`2. http://localhost:${PORT}/readfile`);
    console.log(`3. http://localhost:${PORT}/systemdetails`);
    console.log(`4. http://localhost:${PORT}/getip`);
});