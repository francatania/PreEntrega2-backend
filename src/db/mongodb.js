import mongoose from 'mongoose';

export const init = async ()=>{
    try {
        const URI = '' //agregar la URI

        await mongoose.connect(URI);
        console.log('database has been connected 🙌');
    } catch (error) {
        console.error('Error', error.message);
    }
};
