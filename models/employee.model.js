'use strict';

function model(entity) {
    this._id = entity._id;
    this.employee_number = entity.employee_number;
    this.first_name = entity.first_name;
    this.last_name = entity.last_name;
    this.m_company_id = entity.m_company_id;
    this.email = entity.email;
    this.is_delete = entity.is_delete;
    this.created_by = entity.created_by;
    this.created_date = entity.created_date;
    this.update_by = entity.update_by;
    this.update_date = entity.update_date;
}

model.prototype.getData = function () {
    return {
        _id: this._id,
        employee_number: this.employee_number,
        first_name: this.first_name,
        last_name: this.last_name,
        m_company_id: this.m_company_id,
        email: this.email,
        is_delete: this.is_delete,
        created_by: this.created_by,
        created_date: this.created_date,
        update_by: this.update_by,
        update_date: this.update_date
    };
};

module.exports = model;