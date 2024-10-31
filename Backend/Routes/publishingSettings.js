const express = require('express');
const router = express.Router();
const PublishingSettings = require('../Models/PublishingSettings');

router.post('/', async (req, res) => {
    try {
        const { institutionName, departmentName, isSearchable, extraSearchTerms, requirePassword, password, timezone } = req.body;

        let settings = await PublishingSettings.findOne();

        if (settings) {
            settings.institutionName = institutionName;
            settings.departmentName = departmentName;
            settings.isSearchable = isSearchable;
            settings.extraSearchTerms = extraSearchTerms;
            settings.requirePassword = requirePassword;
            settings.password = password;
            settings.timezone = timezone;

            await settings.save();
            return res.status(200).json({ message: 'Publishing settings updated successfully' });
        } else {
            settings = new PublishingSettings({
                institutionName,
                departmentName,
                isSearchable,
                extraSearchTerms,
                requirePassword,
                password,
                timezone,
            });

            await settings.save();
            return res.status(201).json({ message: 'Publishing settings created successfully' });
        }
    } catch (error) {
        console.error('Error saving publishing settings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
