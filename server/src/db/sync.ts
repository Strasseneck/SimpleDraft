import { sequelize } from "./index";
import User from "./models/User";
import Draft from "./models/Draft";
import Change from "./models/Change";
import Diff from "./models/Diff";


// synchronizes the db and creates tables, just for development
export async function syncDb () {
    await sequelize.sync({ alter : true });
    await User.sync();
    await Draft.sync();
    await Change.sync();
    await Diff.sync();
}