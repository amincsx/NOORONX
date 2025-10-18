import mongoose from 'mongoose';

const DesignConsultationSchema = new mongoose.Schema({
    // Installation Location
    address: {
        type: String,
        required: true
    },
    buildingType: {
        type: String,
        required: true
    },
    ownership: {
        type: String,
        required: true
    },

    // Installation Space
    installationType: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    roofDirection: {
        type: String,
        required: true
    },
    roofAngle: {
        type: String,
        required: true
    },
    obstacles: {
        type: String,
        required: false
    },
    roofMaterial: {
        type: String,
        required: true
    },

    // Energy Consumption
    monthlyConsumption: {
        type: String,
        required: true
    },
    consumptionCategory: {
        type: String,
        required: true
    },
    solarGoal: {
        type: String,
        required: true
    },
    residents: {
        type: String,
        required: true
    },
    highConsumptionDevices: {
        type: [String],
        default: []
    },

    // Financial
    budget: {
        type: String,
        required: true
    },
    budgetCategory: {
        type: String,
        required: true
    },
    financing: {
        type: String,
        required: true
    },
    paybackPeriod: {
        type: String,
        required: true
    },

    // Technical
    gridConnection: {
        type: String,
        required: true
    },
    batteryStorage: {
        type: String,
        required: true
    },
    systemType: {
        type: String,
        required: true
    },

    // Contact
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactPreference: {
        type: String,
        required: true
    },

    // Status and tracking
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    notes: {
        type: String,
        default: ''
    },
    assignedTo: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

export default mongoose.models.DesignConsultation || mongoose.model('DesignConsultation', DesignConsultationSchema);