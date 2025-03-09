db = db.getSiblingDB('licensing_portal');

// Drop existing collections to start fresh
db.license_types.drop();

// Insert default license types
db.license_types.insertMany([
    {
        _id: 'EI001',
        code: 'EI',
        name: 'Engineer Intern',
        description: 'Entry-level engineering certification for recent graduates',
        requirements: [
            'Bachelor\'s degree in Engineering from an ABET-accredited program',
            'Passing score on the Fundamentals of Engineering (FE) exam',
            'Clean criminal record',
            'Three professional references'
        ],
        fee: 150.00,
        processingTime: '4-6 weeks',
        validityPeriod: 48, // 4 years
        renewalPeriod: 6
    },
    {
        _id: 'PE001',
        code: 'PE',
        name: 'Professional Engineer',
        description: 'Full professional engineering license',
        requirements: [
            'Valid Engineer Intern certification',
            '4 years of progressive engineering experience',
            'Passing score on the Professional Engineering (PE) exam',
            'Five professional references'
        ],
        fee: 350.00,
        processingTime: '6-8 weeks',
        validityPeriod: 24, // 2 years
        renewalPeriod: 3
    }
]); 