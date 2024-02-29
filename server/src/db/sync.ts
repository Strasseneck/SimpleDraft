import { sequelize } from "./index";
import User from "./models/User";
import Draft from "./models/Draft";
import Change from "./models/Change";


export async function syncDb () {
    await sequelize.sync({ alter : true });
    await User.sync();
    await Draft.sync();
    await Change.sync();
}