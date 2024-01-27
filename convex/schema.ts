import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })

  .index("by_user", ["userId"])
  .index("by_user_parent", ["userId", "parentDocument"]),

  folders: defineTable({
    title: v.string(), // 文件夹的标题
    userId: v.string(), // 创建文件夹的用户ID
    documents: v.array(v.id("documents")), // 存储该文件夹中文档的ID
  })
      .index("by_user", ["userId"]), // 索引，便于按用户检索文件夹
});
