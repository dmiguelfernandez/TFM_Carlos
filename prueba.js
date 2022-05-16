const Web3 = require('web3');
const express = require ('express');
const app = express();
const Task = require('./build/contracts/TaskCrud.json');
const jsonParse = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000, () => {
    console.log('Server on port $(3000)');
});


const init = async () => {
    //const web3 = new Web3('http://localhost:9545');

    const web3 = new Web3('http://54.157.98.154:8545');

    const id = await web3.eth.net.getId();
    const network = Task.networks[id];
    const address = network.address;
    const contract = new web3.eth.Contract(
        Task.abi,
        address
    );
    
    /*const addresses = await web3.eth.getAccounts();
    const addressSender = addresses[2];*/

    const addresses = await web3.eth.getAccounts();
    //const addressSender = addresses[1];
    const addressSender = "0x1Aeb12BB5AB933b241bE10F2c49229B14aAde76c"


        /*
    const result2 = await contract.methods.createTask("Hola").send({
        from: addressSender,
        gas:3000000
    });
    
    const result3 = await contract.methods.readTask(0).call();
    var jsonresult = JSON.stringify(result3);
    console.log(jsonresult);

    */

    //Definimos el middleware (respuesta a una petición get al servidor express montando (localhost:3000))
    app.get('/get/:id', async (req, res) => {

        //Queremos ver los detalles de una llamada al método insert usando la dirección 0 de prueba que nos proporciona Truffle 
        //const receipt = await contract.methods.createTask("Hola que tal").send({
          //  from: addressSender,
            //gas:3000000
       // });
        //NUMERO DEL BLOQUE Y BLOCK HASH CORRESPONDIENTE A LA TRANSACCIÓN
        //console.log(receipt);
        //console.log(receipt.blockHash);
        //console.log(receipt.blockNumber);

        //const newResult = await contract.methods.readTask(1).call();
        //console.log(newResult)
        const id = req.params.id;
        await contract.methods.readTask(id).call()
        //console.log(leer);
        //res.status(200).json(leer);
        .then((leer) => {
            res.status(201).json( leer );
        }).catch(err => {
            res.status(403).send( "You can't find a task");
        });

        //res.status(201).json( JSON.parse(result) );
             
    });

    app.get('/get', async (req, res) => {
        const receipt = await contract.methods.getTasks().call();

        console.log(receipt);
        res.status(200).json(receipt);   
    });

    
    app.post('/post', async (req,res) =>{

        const stringBody = JSON.stringify(req.body);
        console.log(typeof stringBody,"string que vas a introducir:",stringBody);

        const jsonresult = JSON.parse(stringBody);
        console.log(typeof jsonresult,"JSON que envías en la petición:",jsonresult);
        
        if(stringBody === '' || stringBody === '{}'){
            res.status(400).send("You must send valid json");

        }else{
        
        const receipt = await contract.methods.createTask(stringBody).send({
            from: addressSender,
            gas:3000000
        })

        //console.log(receipt);
        res.status(200).json(receipt );}


    });

    


    app.post('/update/:id',async (req,res) =>{
      
        const stringBody = JSON.stringify(req.body.description);

        if(stringBody === '' || stringBody === '{}'){
            res.status(400).send("You must send valid json");

        }else{
            
            console.log("Vas a cambiar el json con id: ",req.params.id);
            console.log("Vas a cambiar su descripcion por: ",req.body.description);

            
            const receipt = await contract.methods.updateTask(req.params.id,req.body.description).send({
                from: addressSender,
                gas:3000000
            })
        
            console.log(receipt);
            res.status(200).json(receipt);
    }

    });

    app.post('/update', async (req, res) => {
        res.status(400).send("You must ask for a valid id to update!");    
    });

    app.delete('/delete/:id', async (req,res) =>{

        const id = req.params.id;

        const receipt = await contract.methods.deleteTask(id).send({
            from: addressSender,
            gas:3000000
        });
        console.log(receipt);
        res.status(200).json(receipt);


    });

    app.delete('/delete', async (req, res) => {
        res.status(400).send("You must ask for a valid id to delete!");    
    });

    
}

init();
