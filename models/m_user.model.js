'use strict';

function model(entity) {
    this._id = entity._id;
    this.username = entity.username;
    this.password = entity.password;
    this.m_role_id = entity.m_role_id;
    this.m_employee_id = entity.m_employee_id;
    this.is_delete = entity.is_delete;
    this.created_by = entity.created_by;
    this.created_date = entity.created_date;
    this.update_by = entity.update_by;
    this.update_date = entity.update_date;
}

model.prototype.getData = function () {
    return {
        _id: this._id,
        username: this.username,
        password: this.password,
        m_role_id: this.m_role_id,
        m_employee_id: this.m_employee_id,
        is_delete: this.is_delete,
        created_by: this.created_by,
        created_date: this.created_date,
        update_by: this.update_by,
        update_date: this.update_date
    };
};

module.exports = model;