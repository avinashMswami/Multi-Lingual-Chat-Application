import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';


const Translation = async(req,res)=>{
    try {
        const config = {
            credentials: {
              accessKeyId: process.env.accessKeyId,
              secretAccessKey: process.env.secretAccessKey,
            },
            region: 'ap-south-1',
          };

          const client = new TranslateClient(config);
          

    } catch (error) {
        console.log("Error durying translation: ",error);
        res.status(500).json({error:"Internal Server Error"})
    }
}