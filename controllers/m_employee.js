'use strict';

const Response = require('../config/response');
const ObjectId = require('mongodb').ObjectId;
const moment = require('moment');
const logger = require('../config/log');
const employeeModel = require('../models/m_employee.model');

var now = new Date();

const EmployeeController = {
    GetAllHandler: (req, res, next) => {
        logger.info("Initialized Supplier : GetAllHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('m_employee').aggregate([
            { $lookup: { from: 'm_company', localField: 'm_company_id', foreignField: '_id', as: 'Company_Doc' } },
            { $unwind: '$Company_Doc' },
            {
                $match:
                {
                    "is_delete": false

                }
            },
            {
                $project: {
                    'employee_number': 1,
                    'first_name': 1,
                    'last_name': 1,
                    'company_name': '$Company_Doc.name',
                    'created_date': 1,
                    'created_by': 1

                }
            }

        ]).toArray((err, data) => {
            if (err) {
                logger.info("Employee : GetAllHandler Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Employee : GetAllHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({ data: data }, "Employee : GetAllHandler content");
            Response.send(res, 200, data);
        });
    },


    GetDetailByEmployeeIDHandler: (req, res, next) => {
        logger.info("Initialized Employee : GetDetailByEmployeeIDHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        let id = req.params.id;

        global.dbo.collection('m_employee').aggregate([
            { $lookup: { from: 'm_company', localField: 'm_company_id', foreignField: '_id', as: 'Company_Doc' } },
            { $unwind: '$Company_Doc' },
            {
                $match:
                {
                    "is_delete": false,
                    "_id": ObjectId(id)

                }
            },
            {
                $project: {
                    'employee_number': 1,
                    'first_name': 1,
                    'last_name': 1,
                    'company_name': '$Company_Doc.name',
                    'created_date': 1,
                    'created_by': 1

                }
            }

        ]).toArray((err, data) => {
            if (err) {
                logger.info("Employee : GetDetailByEmployeeIDHandler Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Employee : GetDetailByEmployeeIDHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({ data: data }, "Employee : GetDetailByEmployeeIDHandler content");
            Response.send(res, 200, data);
        });
    },



    AddEmployeeHandler: (req, res, next) => {
        logger.info("Initialized Employee : AddEmployeeHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        let entity = req.body;
        let employee = {};

        global.dbo.collection('m_employee').find({'employee_number':entity.employee_number}, function (err, employee) {
            if (err) {
                return next(new Error());
            }
            Response.send(res, 200, entity.employee_number);
        });

        

        // employee._id = entity._id;
        employee.employee_number = entity.employee_number;
        employee.first_name = entity.first_name;
        employee.last_name = entity.last_name;
        employee.m_company_id = ObjectId(entity.m_company_id);
        employee.email = entity.email;
        employee.is_delete = false;
        employee.created_by = null;
        employee.created_date = now;
        employee.update_by = null;
        employee.update_date = now;

        var model = new employeeModel(employee);

        global.dbo.collection('m_employee').insertOne(model, function (err, employee) {
            if (err) {
                return next(new Error());
            }

            Response.send(res, 200, employee);
        });
    },


    UpdateEmployeeHandler : (req, res, next) => {
        let id = req.params.id;
        let reqdata = req.body;
        var oldmodel = {};
        var updatemodel = {};

        global.dbo.collection('m_employee').find({'_id' : ObjectId(id)}).toArray((err, data) => {
            if(err)
            {
                return next(new Error());
            }

            

            oldmodel = data.map((entity) => {
                return new employeeModel(entity);
            });

            updatemodel._id = ObjectId(id);
            updatemodel.employee_number = reqdata.employee_number;
            updatemodel.first_name = reqdata.first_name;
            updatemodel.last_name = reqdata.last_name;
            updatemodel.m_company_id = ObjectId(reqdata.m_company_id);
            updatemodel.email = reqdata.email;
            updatemodel.is_delete=false;
            updatemodel.created_date = oldmodel[0].created_date;
            updatemodel.created_by = oldmodel[0].created_by;
            updatemodel.updated_date = now;
            updatemodel.updated_by = null;

            var model = new employeeModel(updatemodel);

            global.dbo.collection('m_employee').findOneAndUpdate
            (
                {'_id' : ObjectId(id)},
                {$set: model},
                function(err, data){
                    if(err)
                    {
                        return next(new Error());
                    }

                    Response.send(res, 200, data);
                }
            );
        });
    },


    DeleteEmployeeHandler : (req, res, next) => {
        let id = req.params.id;
        // let reqdata = req.body;
        var oldmodel = {};
        var updatemodel = {};

        global.dbo.collection('m_employee').find({'_id' : ObjectId(id)}).toArray((err, data) => {
            if(err)
            {
                return next(new Error());
            }

            oldmodel = data.map((entity) => {
                return new employeeModel(entity);
            });

            updatemodel._id = ObjectId(id);
            updatemodel.employee_number = oldmodel[0].employee_number;
            updatemodel.first_name = oldmodel[0].first_name;
            updatemodel.last_name = oldmodel[0].last_name;
            updatemodel.m_company_id = ObjectId(oldmodel[0].m_company_id);
            updatemodel.email = oldmodel[0].email;
            updatemodel.is_delete=true;
            updatemodel.created_date = oldmodel[0].created_date;
            updatemodel.created_by = oldmodel[0].created_by;
            updatemodel.updated_date = oldmodel[0].update_date;
            updatemodel.updated_by = null;

            var model = new employeeModel(updatemodel);

            global.dbo.collection('m_employee').findOneAndUpdate
            (
                {'_id' : ObjectId(id)},
                {$set: model},
                function(err, data){
                    if(err)
                    {
                        return next(new Error());
                    }

                    Response.send(res, 200, data);
                }
            );
        });
    },


    GetAllHandlerSearch: (req, res, next) => {
        logger.info("Initialized Supplier : GetAllHandlerSearch" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        let search = req.body;
        console.log("Request");
        console.log(search.filter);

        var myMatch = {};
        for (var i = 0; i < search.filter.length; i++) {
            myMatch[search.filter[i].id] = search.filter[i].value;
        }

        console.log("My Match : ");
        console.log(myMatch);


        global.dbo.collection('Suppliers').aggregate([
            {
                $lookup:
                {
                    "localField": "ContactNameTitleId",
                    "from": "Titles",
                    "foreignField": "_id",
                    "as": "SuppliersTitle"
                }
            },
            {
                $unwind: "$SuppliersTitle"
            },
            {
                $project:
                {
                    "_id": "$_id",
                    "CompanyName": "$CompanyName",
                    "ContactName": "$ContactName",
                    "ContactEmail": "$ContactEmail",
                    "ContactTitle": "$ContactTitle",
                    "Address": "$Address",
                    "City": "$City",
                    "PostalCode": "$PostalCode",
                    "Country": "$Country",
                    "Phone": "$Phone",
                    "Fax": "$Fax",
                    "IsDelete": "$IsDelete",
                    "CreatedDate": { "$dateToString": { "format": "%Y-%m-%d", "date": "$CreatedDate" } },
                    "CreatedBy": "$CreatedBy",
                    "UpdateDate": "$UpdateDate",
                    "UpdateBy": { "$dateToString": { "format": "%Y-%m-%d", "date": "$UpdateBy" } },
                    "FullAddress": { $concat: ["$Address", " ", "$City", " ", "$PostalCode", " ", "$Country"] },
                    "Code": "$Code",
                    "ContactNameTitleId": "$ContactNameTitleId",
                    "ContactNameTitle": "$SuppliersTitle.Name"
                }
            },
            {
                $match: {
                    $and:
                        [
                            myMatch
                        ]
                }
            }
        ]).toArray((err, data) => {
            if (err) {
                logger.info("Supplier : GetAllHandlerSearch Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetAllHandlerSearch successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({ data: data }, "Supplier : GetAllHandlerSearch content");
            Response.send(res, 200, data);
        });
    },

    GetDetailBySupplierIDHandler: (req, res, next) => {
        logger.info("Initialized Supplier : GetDetailBySupplierIDHandler" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        let id = req.params.id;

        global.dbo.collection('Suppliers').aggregate([
            {
                $lookup:
                {
                    "localField": "ContactNameTitleId",
                    "from": "Titles",
                    "foreignField": "_id",
                    "as": "SuppliersTitle"
                }
            },
            {
                $unwind: "$SuppliersTitle"
            },
            {
                $match:
                {
                    "IsDelete": false,
                    "_id": ObjectID(id)
                }
            },
            {
                $project:
                {
                    "_id": "$_id",
                    "CompanyName": "$CompanyName",
                    "ContactName": "$ContactName",
                    "ContactEmail": "$ContactEmail",
                    "ContactTitle": "$ContactTitle",
                    "Address": "$Address",
                    "City": "$City",
                    "PostalCode": "$PostalCode",
                    "Country": "$Country",
                    "Phone": "$Phone",
                    "Fax": "$Fax",
                    "IsDelete": "$IsDelete",
                    "CreatedDate": { "$dateToString": { "format": "%Y-%m-%d", "date": "$CreatedDate" } },
                    "CreatedBy": "$CreatedBy",
                    "UpdateDate": "$UpdateDate",
                    "UpdateBy": { "$dateToString": { "format": "%Y-%m-%d", "date": "$UpdateBy" } },
                    "FullAddress": { $concat: ["$Address", " ", "$City", " ", "$PostalCode", " ", "$Country"] },
                    "Code": "$Code",
                    "ContactNameTitleId": "$ContactNameTitleId",
                    "ContactNameTitle": "$SuppliersTitle.Name"
                }
            }
        ]).toArray((err, data) => {
            if (err) {
                logger.info("Supplier : GetDetailBySupplierIDHandler Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetDetailBySupplierIDHandler successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({ data: data }, "Supplier : GetDetailBySupplierIDHandler content");
            Response.send(res, 200, data);
        });
    },
    GetAllHandlerSortByDescending: (req, res, next) => {
        logger.info("Initialized Supplier : GetAllHandlerSortByDescending" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('Suppliers').aggregate([
            {
                $lookup:
                {
                    "localField": "ContactNameTitleId",
                    "from": "Titles",
                    "foreignField": "_id",
                    "as": "SuppliersTitle"
                }
            },
            {
                $unwind: "$SuppliersTitle"
            },
            {
                $match:
                {
                    "IsDelete": false
                }
            },
            {
                $project:
                {
                    "_id": "$_id",
                    "CompanyName": "$CompanyName",
                    "ContactName": "$ContactName",
                    "ContactEmail": "$ContactEmail",
                    "ContactTitle": "$ContactTitle",
                    "Address": "$Address",
                    "City": "$City",
                    "PostalCode": "$PostalCode",
                    "Country": "$Country",
                    "Phone": "$Phone",
                    "Fax": "$Fax",
                    "IsDelete": "$IsDelete",
                    "CreatedDate": { "$dateToString": { "format": "%Y-%m-%d", "date": "$CreatedDate" } },
                    "CreatedBy": "$CreatedBy",
                    "UpdateDate": "$UpdateDate",
                    "UpdateBy": { "$dateToString": { "format": "%Y-%m-%d", "date": "$UpdateBy" } },
                    "FullAddress": { $concat: ["$Address", " ", "$City", " ", "$PostalCode", " ", "$Country"] },
                    "Code": "$Code",
                    "ContactNameTitleId": "$ContactNameTitleId",
                    "ContactNameTitle": "$SuppliersTitle.Name"
                }
            },
            {
                $sort: { "_id": -1 }
            },
            {
                $limit: 1
            },
        ]).toArray((err, data) => {
            if (err) {
                logger.info("Supplier : GetAllHandlerSortByDescending Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetAllHandlerSortByDescending successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({ data: data }, "Supplier : GetAllHandlerSortByDescending content");
            Response.send(res, 200, data);
        });
    },
    GetListContactTitleName: (req, res, next) => {
        logger.info("Initialized Supplier : GetListContactTitleName" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));

        global.dbo.collection('Titles').aggregate([]).toArray((err, data) => {
            if (err) {
                logger.info("Supplier : GetListContactTitleName Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
                logger.error(err);
                return next(new Error());
            }

            logger.info("Supplier : GetListContactTitleName successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            logger.info({ data: data }, "Supplier : GetListContactTitleName content");
            Response.send(res, 200, data);
        });
    }
};

module.exports = EmployeeController;