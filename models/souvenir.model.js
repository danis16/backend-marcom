'use strict';

function model (entity)
{
    this._id            =   entity._id;
    this.code           =   entity.code;
    this.name           =   entity.name;
    this.description    =   entity.description;
    this.m_unit_id      =   entity.m_unit_id;
    this.is_delete      =   entity.is_delete;
    this.created_by     =   entity.created_by;
    this.created_date   =   entity.created_date;
    this.updated_by     =   entity.updated_by;
    this.updated_date   =   entity.updated_date;
}

model.prototype.getData = function()
{
    return {
        _id             : this._id,
        code            : this.code,
        name            : this.name,
		description     : this.description,
		m_unit_id       : this.m_unit_id,
		is_delete       : this.is_delete,
        created_by      : this.created_by,
        created_date    : this.created_date,
		updated_by      : this.updated_by,
		updated_date    : this.updated_date,
    };
};

module.exports = model;