


let get_device_id = function(device_name=null, db=null){
    
    let sql = `SELECT device_id as id 
            WHERE device_name=?
            FROM devices;`;
    
    db.get(sql, [device_name], (err, row) => {
        if(err){
            console.error(err);
            return err;
        }
        else{
            let device_id = row ? row.id : -1;
        }
    });

    return device_id;
};


let get_device_data = function(device_name=null, time=-1, unit=null, data_type=null, db=null){
    let device_id = get_device_id(device_name, db);

    let sql = `SELECT data_entry FROM device_data
            WHERE data_type=${data_type}
            AND device_id=${device_id}
            AND created_at BETWEEN datetime('now', '-${time} ${unit}) AND datetime('now');`;


    db.all(sql, [], (err, rows) => {
        if(err){
            console.error(err);
        }
        let data = rows.map(row => row.data_entry);
    });
    
    return data;
};

