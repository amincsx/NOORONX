import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import DesignConsultation from '@/models/DesignConsultation';
import { requireAuth } from '@/lib/auth';

// GET /api/consultations - list all consultations (admin only)
export async function GET(request: Request) {
    try {
        const ok = await requireAuth(request);
        if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        console.log('Fetching consultations from database...');

        try {
            await connectToDatabase();
            const consultations = await DesignConsultation.find({}).sort({ createdAt: -1 }).lean();
            console.log(`Found ${consultations.length} consultations`);
            return NextResponse.json(consultations, { status: 200 });
        } catch (dbError) {
            console.error('Database fetch error:', dbError);
            return NextResponse.json([], { status: 200 }); // Return empty array on DB error
        }
    } catch (error) {
        console.error('GET consultations error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        console.log('Consultation API hit');
        const body = await request.json();
        console.log('Received data:', body);

        // Create consultation data object with default values for required fields
        const consultationData = {
            address: body.address || 'نامشخص',
            buildingType: body.buildingType || 'apartment',
            ownership: body.ownership || 'owner',
            installationType: body.installationType || 'roof',
            area: body.area || '0',
            roofDirection: body.roofDirection || 'south',
            roofAngle: body.roofAngle || '30',
            obstacles: body.obstacles || '',
            roofMaterial: body.roofMaterial || 'نامشخص',
            monthlyConsumption: body.monthlyConsumption || '0',
            consumptionCategory: body.consumptionCategory || 'medium',
            solarGoal: body.solarGoal || 'cost',
            residents: body.residents || '1',
            highConsumptionDevices: body.highConsumptionDevices || [],
            budget: body.budget || '0',
            budgetCategory: body.budgetCategory || '50-100',
            financing: body.financing || 'no',
            paybackPeriod: body.paybackPeriod || 'under3',
            gridConnection: body.gridConnection || 'نامشخص',
            batteryStorage: body.batteryStorage || 'نامشخص',
            systemType: body.systemType || 'نامشخص',
            fullName: body.fullName || 'نامشخص',
            phone: body.phone || 'نامشخص',
            email: body.email || 'noemail@example.com',
            contactPreference: body.contactPreference || 'phone',
            status: 'pending',
            priority: 'medium',
            notes: '',
            assignedTo: ''
        };

        console.log('Formatted consultation data:', consultationData);

        try {
            console.log('Connecting to MongoDB...');
            await connectToDatabase();
            console.log('MongoDB connected, creating consultation...');

            const created = await DesignConsultation.create(consultationData);
            console.log('Consultation created successfully with ID:', created._id);

            return NextResponse.json({
                success: true,
                message: 'Consultation saved successfully',
                data: created
            }, { status: 201 });

        } catch (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json({
                success: false,
                message: 'Failed to save to database',
                error: dbError instanceof Error ? dbError.message : 'Unknown database error'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}