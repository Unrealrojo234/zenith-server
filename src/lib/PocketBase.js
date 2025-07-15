import  Pocketbase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';


const pb = new PocketBase(PUBLIC_PB_URL);


export default pb;