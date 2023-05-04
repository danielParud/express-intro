import express from "express";



const app = express ();

app.use(express.json());

const data = [];

app.get("/", (req, res)=>{
  return res.status(200).json("To aqui!")
});


// CREATE

let nextId = 1;

app.post("/create", (req, res) => {
  const newJuice = { ...req.body, id: nextId };
  data.push(newJuice);
  nextId++;
  return res.status(201).json(newJuice);
});
  
// READ ALL
  
  app.get("/all", (req, res) => {
    return res.status(200).json(data);
  });

//SEE DETAILS

app.get("/all/:juiceId", (req, res) => {
  const juiceId = parseInt(req.params.juiceId);
  const juice = data.find(juice => juice.id === juiceId);

  if (!juice) {
    return res.status(404).json({ message: "nao tem esse suco bro" });
  }

  return res.status(200).json(juice);
});

//EDIT

app.fetch("/all/:juiceId", (req, res) => {
  const juiceId = parseInt(req.params.juiceId);
  const juiceIndex = data.findIndex(juice => juice.id === juiceId);

  if (juiceIndex === -1) {
    return res.status(404).json({ message: "nao tem esse suco bro" });
  }

  data[juiceIndex] = { ...data[juiceIndex], ...req.body };

  return res.status(200).json(data[juiceIndex]);
});

  
//DELETE
  app.delete("/all/:juiceId", (req, res) => {
    const juiceId = parseInt(req.params.juiceId);
    console.log(data);
    const juiceIndex = data.findIndex(juice => juice.id === juiceId);
  
    if (juiceIndex === -1) {
      return res.status(404).json({ message: "nao tem esse suco bro" });
    }
  
    data.splice(juiceIndex, 1);
  
    return res.status(200).json({ message: "Excluído com sucesso" });
  
  });


app.listen(4000, () => {
    console.log("Conectado a porta 4000.");
  });