import mongoose, { Schema, Document } from 'mongoose';

export interface IHistory extends Document {
    imageBytes: Buffer,
    prediction: string,
    confidence: string,
    metadata: {
        metrics: {
            estimated_decomposition_time?: string,
            estimated_co2_emissions?: string,
            estimated_water_footprint?: string,
            estimated_energy_embodied?: string
        },
        properties: {
            is_organic?: boolean,
            is_recyclable?: boolean,
            is_compostable?: boolean,
            is_hazardous?: boolean
        }
    },
    createdAt: Date
};


const HistorySchema: Schema = new Schema({
    imageBytes: { type: Buffer, required: true },
    prediction: { type: String, required: true },
    confidence: { type: String, required: true },
    metadata: {
        metrics: {
            estimated_decomposition_time: { type: String, required: false },
            estimated_co2_emissions: { type: String, required: false },
            estimated_water_footprint: { type: String, required: false },
            estimated_energy_embodied: { type: String, required: false },
        },
        properties: {
            is_organic: { type: String, required: false },
            is_recyclable: { type: String, required: false },
            is_compostable: { type: String, required: false },
            is_hazardous: { type: String, required: false },
        }
    },
    createdAt: { type: Date, default: Date.now, required: true }
});

const History = mongoose.model<IHistory>('History', HistorySchema);
export default History;