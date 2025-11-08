"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
    id: Number,
    title: String,
    author: String,
    pages: Number,
    pagesRead: Number,
    status: String,
    price: Number,
    format: String,
    suggestedBy: String,
    finished: Boolean,
});
exports.BookModel = mongoose_1.default.model("Book", BookSchema);
