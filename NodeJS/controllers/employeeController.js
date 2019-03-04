const express=require("express");

var router=express.Router();
var {Employee}=require("../models/employee");
var ObjectId=require('mongoose').Types.ObjectId;
router.get('/',(req,res)=>{
   
    Employee.find((err,docs)=>{
        if(!err)
        {
            res.send(docs);
        }
        else
        {
            console.log("list error "+JSON.stringify(err,undefined,2));
        }
    })
})
router.post('/',(req,res)=>{
    
    var emp=new Employee({
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
    });
    emp.save((err,doc)=>{
    if(!err)
    {
        res.send(doc);
    }
    else
    {
        console.log("Employee save error "+JSON.stringify(err,undefined,2));
    }
    });
})

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    {
        res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    Employee.findById(req.params.id,(err,docs)=>{
        if(!err)
        {
            res.send(docs);
        }
        else
        {
            console.log("Employee Find Error");
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    {
        res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    var emp={
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,docs)=>{
        if(!err)
        {
            res.send(docs);
        }
        else
        {
            console.log("Update error");
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    {
        res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    Employee.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err)
        {
            res.send(docs);
        }
        else
        {
            console.log("Delete Error");
        }
    })
})



module.exports=router;