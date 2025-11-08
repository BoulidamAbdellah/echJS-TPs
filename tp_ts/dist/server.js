#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const Mongo_model_1 = require("./Mongo_model");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public")); // pour Tailwind et fichiers statiques
// Pug
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "../views"));
// Connexion MongoDB
mongoose_1.default.connect("mongodb://localhost:27017/books_tracker")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
// --- ROUTES ---
// Redirect vers /list
app.get("/", (req, res) => {
    res.redirect("/list");
});
// 🟦 LISTE DES LIVRES
app.get("/list", async (req, res) => {
    const books = await Mongo_model_1.BookModel.find();
    const totalBooksRead = books.filter(b => b.status === "Finished").length;
    const totalPages = books.reduce((sum, b) => sum + (b.pagesRead || 0), 0);
    res.render("list", { books, totalBooksRead, totalPages });
});
// 🟩 FORMULAIRE D’AJOUT
app.get("/books/add", (req, res) => {
    res.render("formulaire"); // page Pug à créer → add.pug
});
// 🟢 TRAITEMENT D’AJOUT
// 🟢 TRAITEMENT D’AJOUT
app.post("/books/add", async (req, res) => {
    try {
        const { title, author, pages, pagesRead, status, format } = req.body;
        // Chercher le dernier livre pour récupérer son id
        const lastBook = await Mongo_model_1.BookModel.findOne().sort({ id: -1 }); // tri décroissant
        const newId = lastBook ? lastBook.id + 1 : 1; // si aucun livre, commencer à 1
        const book = new Mongo_model_1.BookModel({
            id: newId, // assignation de l'id personnalisé
            title,
            author,
            pages,
            pagesRead,
            status,
            format
        });
        await book.save();
        res.redirect("/list");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de l'ajout du livre");
    }
});
// 🔴 SUPPRESSION par title
app.post("/books/delete/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await Mongo_model_1.BookModel.findOneAndDelete({ id });
        if (!result)
            return res.status(404).send("Livre introuvable");
        res.redirect("/list");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la suppression");
    }
});
// 🟠 FORMULAIRE DE MODIFICATION par title
app.get("/books/edit/:id", async (req, res) => {
    const id = Number(req.params.id);
    const book = await Mongo_model_1.BookModel.findOne({ id });
    res.render("edit", { book });
});
// 🟡 TRAITEMENT DE MODIFICATION par title
app.post("/books/edit/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const book = await Mongo_model_1.BookModel.findOneAndUpdate({ id }, req.body, { new: true });
        if (!book)
            return res.status(404).send("Livre introuvable");
        res.redirect("/list");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification");
    }
});
// --- Serveur
const PORT = 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
