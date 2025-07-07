import express from "express"

const router=express();

router.get(":id",getPostComment);
router.patch(":id",addComment);
router.delete(":id",deleteComment);

export default router