import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import DesignConsultation from '@/models/DesignConsultation';
import { requireAuth } from '@/lib/auth';

// GET /api/design-consultations - list all consultations (admin only)
export async function GET(request: Request) {
    try {
        const ok = await requireAuth(request);
        if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const NODE_ENV = process.env.NODE_ENV || 'development';

        try {
            await connectToDatabase();
            const consultations = await DesignConsultation.find({}).sort({ createdAt: -1 }).lean();
            return NextResponse.json(consultations, {
                status: 200,
                headers: { 'X-Database': 'mongodb' }
            });
        } catch (mongoError) {
            console.log('MongoDB not available:', mongoError);

            if (NODE_ENV === 'production') {
                return NextResponse.json(
                    { message: 'Database connection failed', error: 'MongoDB unavailable' },
                    { status: 503 }
                );
            }

            // Return empty array for development when DB is not available
            return NextResponse.json([], {
                status: 200,
                headers: { 'X-Database': 'mock' }
            });
        }
    } catch (error) {
        console.error('GET /api/design-consultations error', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// POST /api/design-consultations - create new consultation (public endpoint)
export async function POST(request: Request) {
    try {
        console.log('API POST route hit - starting consultation creation');
        const body = await request.json();

        console.log('Received request body:', body);
        console.log('Body type:', typeof body);
        console.log('Body keys:', Object.keys(body));

        const consultationData = {
            // Installation Location
            address: body.address,
            buildingType: body.buildingType,
            ownership: body.ownership,

            // Installation Space
            installationType: body.installationType,
            area: body.area,
            roofDirection: body.roofDirection,
            roofAngle: body.roofAngle,
            obstacles: body.obstacles || '',
            roofMaterial: body.roofMaterial,

            // Energy Consumption
            monthlyConsumption: body.monthlyConsumption,
            consumptionCategory: body.consumptionCategory,
            solarGoal: body.solarGoal,
            residents: body.residents,
            highConsumptionDevices: body.highConsumptionDevices || [],

            // Financial
            budget: body.budget,
            budgetCategory: body.budgetCategory,
            financing: body.financing,
            paybackPeriod: body.paybackPeriod,

            // Technical
            gridConnection: body.gridConnection,
            batteryStorage: body.batteryStorage,
            systemType: body.systemType,

            // Contact
            fullName: body.fullName,
            phone: body.phone,
            email: body.email,
            contactPreference: body.contactPreference,

            // Default values
            status: 'pending',
            priority: 'medium',
            notes: '',
            assignedTo: ''
        };

        const NODE_ENV = process.env.NODE_ENV || 'development';

        console.log('Attempting to save consultation data:', consultationData);

        try {
            console.log('Connecting to MongoDB...');
            await connectToDatabase();
            console.log('MongoDB connected, creating consultation...');
            const created = await DesignConsultation.create(consultationData);
            console.log('Consultation created successfully:', created._id);
            return NextResponse.json(created, {
                status: 201,
                headers: { 'X-Database': 'mongodb' }
            });
        } catch (mongoError) {
            console.log('MongoDB not available:', mongoError);
            console.log('MongoError type:', mongoError instanceof Error ? mongoError.name : typeof mongoError);
            console.log('MongoError message:', mongoError instanceof Error ? mongoError.message : mongoError);

            if (NODE_ENV === 'production') {
                return NextResponse.json(
                    { message: 'Database connection failed', error: 'MongoDB unavailable' },
                    { status: 503 }
                );
            }

            // For development, return a mock success response
            console.log('Creating mock response for development...');
            const mockResponse = {
                ...consultationData,
                id: Date.now().toString(),
                _id: Date.now().toString(),
                createdAt: new Date(),
                updatedAt: new Date()
            };

            console.log('Mock response created:', mockResponse);
            return NextResponse.json(mockResponse, {
                status: 201,
                headers: { 'X-Database': 'mock' }
            });
        }
    } catch (error) {
        console.error('POST /api/design-consultations error', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// PUT /api/design-consultations - update consultation (admin only)
export async function PUT(request: Request) {
    try {
        const ok = await requireAuth(request);
        if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id, ...updateData } = await request.json();

        const NODE_ENV = process.env.NODE_ENV || 'development';

        try {
            await connectToDatabase();
            const updated = await DesignConsultation.findByIdAndUpdate(
                id,
                { ...updateData, updatedAt: new Date() },
                { new: true }
            ).lean();

            if (!updated) {
                return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
            }

            return NextResponse.json(updated, {
                status: 200,
                headers: { 'X-Database': 'mongodb' }
            });
        } catch (mongoError) {
            console.log('MongoDB not available:', mongoError);

            if (NODE_ENV === 'production') {
                return NextResponse.json(
                    { message: 'Database connection failed', error: 'MongoDB unavailable' },
                    { status: 503 }
                );
            }

            return NextResponse.json({ message: 'Update not available in development mode' }, { status: 503 });
        }
    } catch (error) {
        console.error('PUT /api/design-consultations error', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// DELETE /api/design-consultations - delete consultation (admin only)
export async function DELETE(request: Request) {
    try {
        const ok = await requireAuth(request);
        if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Consultation ID is required' }, { status: 400 });
        }

        const NODE_ENV = process.env.NODE_ENV || 'development';

        try {
            await connectToDatabase();
            const deleted = await DesignConsultation.findByIdAndDelete(id);

            if (!deleted) {
                return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
            }

            return NextResponse.json({ message: 'Consultation deleted successfully' }, {
                status: 200,
                headers: { 'X-Database': 'mongodb' }
            });
        } catch (mongoError) {
            console.log('MongoDB not available:', mongoError);

            if (NODE_ENV === 'production') {
                return NextResponse.json(
                    { message: 'Database connection failed', error: 'MongoDB unavailable' },
                    { status: 503 }
                );
            }

            return NextResponse.json({ message: 'Delete not available in development mode' }, { status: 503 });
        }
    } catch (error) {
        console.error('DELETE /api/design-consultations error', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}