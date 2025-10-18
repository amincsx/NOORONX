import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import DesignConsultation from '@/models/DesignConsultation';
import { requireAuth } from '@/lib/auth';

// DELETE /api/consultations/[id] - delete a consultation (admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const ok = await requireAuth(request);
        if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        try {
            await connectToDatabase();
            const deleted = await DesignConsultation.findByIdAndDelete(id);

            if (!deleted) {
                return NextResponse.json({ message: 'Consultation not found' }, { status: 404 });
            }

            return NextResponse.json({
                message: 'Consultation deleted successfully',
                id: id
            }, { status: 200 });

        } catch (dbError) {
            console.error('Database delete error:', dbError);
            return NextResponse.json({
                message: 'Failed to delete consultation',
                error: dbError instanceof Error ? dbError.message : 'Unknown database error'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('DELETE consultation error:', error);
        return NextResponse.json({
            message: 'Server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// GET /api/consultations/[id] - get a specific consultation (admin only)
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const ok = await requireAuth(request);
        if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        try {
            await connectToDatabase();
            const consultation = await DesignConsultation.findById(id).lean();

            if (!consultation) {
                return NextResponse.json({ message: 'Consultation not found' }, { status: 404 });
            }

            return NextResponse.json(consultation, { status: 200 });

        } catch (dbError) {
            console.error('Database fetch error:', dbError);
            return NextResponse.json({
                message: 'Failed to fetch consultation',
                error: dbError instanceof Error ? dbError.message : 'Unknown database error'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('GET consultation error:', error);
        return NextResponse.json({
            message: 'Server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}