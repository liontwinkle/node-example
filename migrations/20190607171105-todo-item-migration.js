/**
 * Create TodoItems table
 */
class Migration {
    up(queryInterface, DataTypes) {
        return queryInterface.createTable('TodoItems', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            position: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            }
        });
    }

    down(queryInterface, DataTypes) {
        return queryInterface.dropTable('TodoItems');
    }
}

module.exports = new Migration();
