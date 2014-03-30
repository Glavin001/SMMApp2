/*
Course Model
*/

module.exports = function(sequelize, DataTypes) {
    
    return sequelize.define("course", {
        // Attributes
        crn: {
            type: DataTypes.STRING(5),
            comment: ""
        },
        Subj_code: { 
            type: DataTypes.STRING(4),
            comment: ""
        },
        Crse_numb: {
            type: DataTypes.STRING(5),
            comment: ""
        },
        Seq_numb: {
            type: DataTypes.STRING(3),
            comment: ""
        },
        Crse_title: {
            type: DataTypes.STRING(30),
            comment: ""
        },
        Levl_code: {
            type: DataTypes.STRING(2),
            comment: ""
        },
        Text_narrative: {
            type: DataTypes.STRING(30),
            comment: ""
        },
        Term_code: {
            type: DataTypes.STRING(6),
            comment: ""
        },
        Bldg_code: {
            type: DataTypes.STRING(6),
            comment: ""
        },
        Room_code: {
            type: DataTypes.STRING(10),
            comment: ""
        },
        Start_date: {
            type: DataTypes.DATE,
            comment: ""
        },
        End_date: {
            type: DataTypes.DATE,
            comment: ""
        },
        Begin_time: {
            type: DataTypes.STRING(4),
            comment: ""
        },
        End_time: {
            type: DataTypes.STRING(4),
            comment: ""
        }
    }, {
        // Options
        tableName: "courses"
    });

};