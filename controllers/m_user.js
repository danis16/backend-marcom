"use strict";

const Response = require("../config/response");
const jwt = require("jsonwebtoken");
const secret = require("../config/token");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const logger = require("../config/log");
const ObjectId = require("mongodb").ObjectId;
const UserModel = require("../models/m_user.model");

const UserController = {
  LoginHandler: (req, res, next) => {
    logger.info(
      "LoginHandler accessed" +
        " at " +
        moment().format("DD/MM/YYYY, hh:mm:ss a")
    );
    logger.info({ data: req.body }, "LoginHandler body content");

    var usernm = req.body.username;
    var password = req.body.password;

    if (usernm == null || password == null) {
      logger.info(
        "LoginHandler failed" +
          " at " +
          moment().format("DD/MM/YYYY, hh:mm:ss a")
      );
      logger.info("LoginHandler failed reason : User tidak ditemukan");
      Response.send(res, 404, "User tidak ditemukan");
    } else {
      global.dbo
        .collection("m_user")
        .findOne({ username: usernm }, (err, data) => {
          if (data) {
            if (bcrypt.compareSync(password, data.password)) {
              // Generate JWT Token
              let token = jwt.sign(data, secret.secretkey, {
                expiresIn: 7200
              });

              delete data.password;

              let doc = {
                userdata: data,
                token: token
              };

              logger.info(
                "LoginHandler successfully" +
                  " at " +
                  moment().format("DD/MM/YYYY, hh:mm:ss a")
              );
              logger.info({ data: doc }, "LoginHandler user content");
              Response.send(res, 200, doc);
            } else {
              logger.info(
                "LoginHandler failed" +
                  " at " +
                  moment().format("DD/MM/YYYY, hh:mm:ss a")
              );
              logger.info(
                "LoginHandler failed reason : Password yang Anda masukkan salah"
              );
              Response.send(res, 404, "Password yang Anda masukkan salah");
            }
          } else {
            logger.info(
              "LoginHandler failed" +
                " at " +
                moment().format("DD/MM/YYYY, hh:mm:ss a")
            );
            logger.info("LoginHandler failed reason : User tidak ditemukan");
            Response.send(res, 404, "User tidak ditemukan");
          }
        });
    }
  },
  LogoutHandler: (req, res, next) => {
    let data = {
      status: "Logout berhasil",
      userdata: null,
      token: null
    };

    logger.info(
      "LogoutHandler successfully" +
        " at " +
        moment().format("DD/MM/YYYY, hh:mm:ss a")
    );
    Response.send(res, 200, data);
  },

  // GET ALL USER
    GetAll: (req, res, next) => {
    logger.info(
      "Initialized user : GetAll" +
        " at " +
        moment().format("DD/MM/YYYY, hh:mm:ss a")
    );

    global.dbo
      .collection("m_user")
      .aggregate([      
        { $lookup: { from: 'm_role', localField: 'm_role_id', foreignField: '_id', as: 'role_lookup' } },
        { $lookup: { from: 'm_employee', localField: 'm_employee_id', foreignField: '_id', as: 'employee_lookup' } },
              { $unwind: '$role_lookup' },
              { $unwind: '$employee_lookup' },
              {
                  $match:
                  {
                      "is_delete": false
  
                  }
              },
              {
                  $project: {
                    username :1,
                    password:1,
                    role_name: '$role_lookup.name',
                    employee_first_name : '$employee_lookup.first_name',
                    employee_last_name : '$employee_lookup.last_name',
                    is_delete: 1,
                    created_by: 1,
                    created_date: 1,
                    updated_by: 1,
                    updated_date: 1  
                  }
              }
  
          ])
      .toArray((err, data) => {
        if (err) {
          logger.info(
            "User : GetAll Error" +
              " at " +
              moment().format("DD/MM/YYYY, hh:mm:ss a")
          );
          logger.error(err);
          return next(new Error());
        }

        logger.info(
          "User : GetAll successfully" +
            " at " +
            moment().format("DD/MM/YYYY, hh:mm:ss a")
        );
        logger.info({ data: data }, "User : GetAll content");
        Response.send(res, 200, data);
      });
  },

  //GET ALL USER BY ID
  GetDetail: (req, res, next) => {
    logger.info(
      "Initialized User : GetDetail" +
        " at " +
        moment().format("DD/MM/YYYY, hh:mm:ss a")
    );
    let id = req.params.id;

    global.dbo
      .collection("m_user")
      .aggregate([      
        { $lookup: { from: 'm_role', localField: 'm_role_id', foreignField: '_id', as: 'role_lookup' } },
        { $lookup: { from: 'm_employee', localField: 'm_employee_id', foreignField: '_id', as: 'employee_lookup' } },
              { $unwind: '$role_lookup' },
              { $unwind: '$employee_lookup' },
              {
                  $match:
                  {
                      "is_delete": false
  
                  }
              },
              {
                  $project: {
                    username :1,
                    password:1,
                    role_name: '$role_lookup.name',
                    employee_first_name : '$employee_lookup.first_name',
                    employee_last_name : '$employee_lookup.last_name',
                    is_delete: 1,
                    created_by: 1,
                    created_date: 1,
                    updated_by: 1,
                    updated_date: 1  
  
                  }
              }
  
          ])
      .toArray((err, data) => {
        if (err) {
          logger.info(
            "User : GetDetail Error" +
              " at " +
              moment().format("DD/MM/YYYY, hh:mm:ss a")
          );
          logger.error(err);
          return next(new Error());
        }

        logger.info(
          "User : GetDetail successfully" +
            " at " +
            moment().format("DD/MM/YYYY, hh:mm:ss a")
        );
        logger.info({ data: data }, "User : GetDetail content");
        Response.send(res, 200, data);
      });
  },

  //Post USER
  Create: (req, res, next) => {
    logger.info(
      "Initialized User : Create" +
        " at " +
        moment().format("DD/MM/YYYY, hh:mm:ss a")
    );
    let reqdata = req.body;
    var data = {};

    global.dbo
      .collection("m_user")
      .aggregate([      
        { $lookup: { from: 'm_role', localField: 'm_role_id', foreignField: '_id', as: 'role_lookup' } },
        { $lookup: { from: 'm_employee', localField: 'm_employee_id', foreignField: '_id', as: 'employee_lookup' } },
              { $unwind: '$role_lookup' },
              { $unwind: '$employee_lookup' },
              {
                  $match:
                  {
                      "is_delete": false
  
                  }
              },
              {
                  $project: {
                    username :1,
                    password:1,
                    role_name: '$role_lookup.name',
                    employee_first_name : '$employee_lookup.first_name',
                    employee_last_name : '$employee_lookup.last_name',
                    is_delete: 1,
                    created_by: 1,
                    created_date: 1,
                    updated_by: 1,
                    updated_date: 1  
                  }
              }
  
          ])

    data.m_role_id = ObjectId(reqdata.m_role_id);
    data.m_employee_id = ObjectId(reqdata.m_employee_id);
    data.username = reqdata.username;
    data.password = reqdata.password;
    data.is_delete = false;
    data.created_by = "Administrator";
    data.created_date = Date();
    data.updated_by = null;
    data.updated_date = Date();

    var model = new UserModel(data);

    global.dbo.collection("m_user").insertOne(model, function(err, data) {
      if (err) {
        // logger.info("Souvenir : Create Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
        // logger.error(err);
        return next(new Error());
      }

      // let modelSuppliers = data.map((entity) => {
      //     return new suppliersModel(entity);
      // });
      // logger.info("Souvenir : Create successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
      // logger.info({data : data}, "Souvenir : Create content");
      Response.send(res, 200, data);
    });
  },

  //PUT USER
  Update: (req, res, next) => {
    logger.info(
      "Initialized User : Update" +
        " at " +
        moment().format("DD/MM/YYYY, hh:mm:ss a")
    );

    let id = req.params.id;
    let reqdata = req.body;
    var oldmodel = {};
    var updatemodel = {};
      
      global.dbo
      .collection("m_user")
      .find({ is_delete: false, _id: ObjectID(id) })
      .aggregate([      
        { $lookup: { from: 'm_role', localField: 'm_role_id', foreignField: '_id', as: 'role_lookup' } },
        { $lookup: { from: 'm_employee', localField: 'm_employee_id', foreignField: '_id', as: 'employee_lookup' } },
              { $unwind: '$role_lookup' },
              { $unwind: '$employee_lookup' },
              {
                  $match:
                  {
                      "is_delete": false
  
                  }
              },
              {
                  $project: {
                    username :1,
                    password:1,
                    role_name: '$role_lookup.name',
                    employee_first_name : '$employee_lookup.first_name',
                    employee_last_name : '$employee_lookup.last_name',
                    is_delete: 1,
                    created_by: 1,
                    created_date: 1,
                    updated_by: 1,
                    updated_date: 1  
                  }
              }
  
          ])
      .toArray((err, data) => {
        if (err) {
          logger.info(
            "User : Update Error" +
              " at " +
              moment().format("DD/MM/YYYY, hh:mm:ss a")
          );
          logger.error(err);
          return next(new Error());
        }

        oldmodel = data.map(entity => {
          return new UserModel(entity);
        });

        updatemodel._id = ObjectID(id);

        if (
          reqdata.m_role_id == null ||
          reqdata.m_role_id == undefined ||
          reqdata.m_role_id == ""
        ) {
          updatemodel.m_role_id = oldmodel[0].m_role_id;
        } else {
          updatemodel.m_role_id = reqdata.m_role_id;
        }

        if (
          reqdata.m_employee_id == null ||
          reqdata.m_employee_id == undefined ||
          reqdata.m_employee_id == ""
        ) {
          updatemodel.m_employee_id = oldmodel[0].m_employee_id;
        } else {
          updatemodel.m_employee_id = reqdata.m_employee_id;
        }

        if (
          reqdata.username == null ||
          reqdata.username == undefined ||
          reqdata.username == ""
        ) {
          updatemodel.username = oldmodel[0].username;
        } else {
          updatemodel.username = reqdata.username;
        }

        if (
          reqdata.password == null ||
          reqdata.password == undefined ||
          reqdata.password == ""
        ) {
          updatemodel.password = oldmodel[0].password;
        } else {
          updatemodel.password = ObjectID(reqdata.password);
        }

        updatemodel.is_delete = false;
        updatemodel.created_by = oldmodel[0].created_by;
        updatemodel.created_date = oldmodel[0].created_date;
        updatemodel.updated_by = "Administrator";
        updatemodel.updated_date = now;

        var model = new UserModel(updatemodel);

        global.dbo
          .collection("m_user")
          .findOneAndUpdate({ _id: ObjectID(id) }, { $set: model }, function(
            err,
            data
          ) {
            if (err) {
              logger.info(
                "User : Update Error" +
                  " at " +
                  moment().format("DD/MM/YYYY, hh:mm:ss a")
              );
              logger.error(err);
              return next(new Error());
            }
            logger.info(
              "User : Create successfully" +
                " at " +
                moment().format("DD/MM/YYYY, hh:mm:ss a")
            );
            logger.info({ data: data }, "User : Create content");
            Response.send(res, 200, data);
          });
      });
  },

  //DELETE USER
  Delete: (req, res, next) => {
    logger.info(
      "Initialized User : Delete" +
        " at " +
        moment().format("DD/MM/YYYY, hh:mm:ss a")
    );

    let id = req.params.id;
    var oldmodel = {};
    var deletemodel = {};

    global.dbo
      .collection("m_user")
      .findOne({ _id: ObjectID(id) })
      .toArray((err, data) => {
        if (err) {
          // logger.info("Souvenir : Delete Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
          // logger.error(err);
          return next(new Error());
        }

        oldmodel = data.map(entity => {
          return new UserModel(entity);
        });

        deletemodel._id = ObjectID(id);
        deletemodel.username = oldmodel[0].username;
        deletemodel.password = oldmodel[0].password;
        deletemodel.m_role_id = oldmodel[0].m_role_id;
        deletemodel.m_employee_id = oldmodel[0].m_employee_id;
        deletemodel.is_delete = true;
        deletemodel.created_by = oldmodel[0].created_by;
        deletemodel.created_date = oldmodel[0].created_date;
        deletemodel.updated_by = oldmodel[0].updated_by;
        deletemodel.updated_date = null;

        var model = new UserModel(deletemodel);

        global.dbo
          .collection("m_user")
          .findOneAndUpdate({ _id: ObjectID(id) }, { $set: model }, function(
            err,
            data
          ) {
            if (err) {
              // logger.info("Souvenir : Delete Error" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
              // logger.error(err);
              return next(new Error());
            }
            // logger.info("Souvenir : Delete successfully" + " at " + moment().format('DD/MM/YYYY, hh:mm:ss a'));
            // logger.info({data : data}, "Souvenir : Delete content");
            Response.send(res, 200, data);
          });
    });
}
};

module.exports = UserController;
