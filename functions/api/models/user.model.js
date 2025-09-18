//Server/api/models/user.model.js
// /functions/models/user.model.js
export async function findUserByEmail(env, email) {
  const db = connectDB(env);
  const { results } = await db.prepare(
    "SELECT * FROM users WHERE email = ?"
  ).bind(email).all();

  return results[0] || null;
}

export async function createUser(env, { username, email, password }) {
  const db = connectDB(env);
  const { lastInsertRowid } = await db.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  ).bind(username, email, password).run();

  return { id: lastInsertRowid, username, email };
}

/* 
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
                             username : {type: String, required:true},
                             email : {type: String, required:true},
                             password : {type: String, required:true},
                                 },   
                                 {timestamps : true} );
        
        const User = mongoose.models?.User || mongoose.model("User", userSchema);

    export default User;
     */