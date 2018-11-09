'use strict';

function model (entity)
{
    this._id                        =   entity._id;
    this.code                       =   entity.code;
    this.type                       =   entity.type;
    this.t_event_id                 =   entity.t_event_id;
    this.request_by                 =   entity.request_by;
    this.request_date               =   entity.request_date;
    this.request_due_date           =   entity.request_due_date;
    this.approved_by                =   entity.approved_by;
    this.approved_date              =   entity.approved_date;
    this.received_by                =   entity.received_by;
    this.received_date              =   entity.received_date;
    this.settlement_by              =   entity.settlement_by;
    this.settlement_date            =   entity.settlement_date;
    this.settlement_approved_by     =   entity.settlement_approved_by;
    this.settlement_approved_date   =   entity.settlement_approved_date;
    this.status                     =   entity.status;
    this.note                       =   entity.note;
    this.reject_reason              =   entity.reject_reason;
    this.is_delete                  =   entity.is_delete;
    this.created_by                 =   entity.created_by;
    this.created_date               =   entity.created_date;
    this.updated_by                 =   entity.updated_by;
    this.updated_date               =   entity.updated_date;
}

model.prototype.getData = function()
{
    return {
        _id                             : this._id,
        code                            : this.code,
        type                            : this.type,
		t_event_id                      : this.t_event_id,
        request_by                      : this.request_by,
        request_date                    : this.request_date,
        request_due_date                : this.request_due_date,
        approved_by                     : this.approved_by,
		approved_date                   : this.approved_date,
        received_by                     : this.received_by,
        received_date                   : this.received_date,
        settlement_by                   : this.settlement_by,
        settlement_date                 : this.settlement_date,
        settlement_approved_by          : this.settlement_approved_by,
		settlement_approved_date        : this.settlement_approved_date,
        status                          : this.status,
        note                            : this.note,
		reject_reason                   : this.reject_reason,
		is_delete                       : this.is_delete,
        created_by                      : this.created_by,
        created_date                    : this.created_date,
		updated_by                      : this.updated_by,
		updated_date                    : this.updated_date,
    };
};

module.exports = model;