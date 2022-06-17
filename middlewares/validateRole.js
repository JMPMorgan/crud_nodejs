export const isAdminRole=(req,res,next)=>{

    const {role,name}=req.userAuth;
    if(role !== 'ADMIN'){
        return res.status(401).json({
            msg:`User doesn't have the permission to do this operation`
        });
    }
    next();
}

export const hasRole=(...roles)=>{

    return(req,res,next)=>{
        if(!req.userAuth){
            return res.status(500).json({
                msg:'User undefinied in validate Role'
            });
        }
        if(!roles.includes(req.userAuth.role)){
            return res.status(401).json({
                msg:`User doesn't have a role`
            });
        }
        next();
    }
}