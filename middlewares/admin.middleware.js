// export const isAdmin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     return res.status(403).json({ 
//       message: "Access denied. Admins only." 
//     });
//   }
// };


export const isAdmin = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      message: "Not authenticated",
      status: "error"
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only.",
      status: "error"
    });
  }

  next();

};