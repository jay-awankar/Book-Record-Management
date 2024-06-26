const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");


const router = express.Router();

router.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

router.get("/:id", (req,res) => {
    const { id } = req.params;
    console.log(req.params);

    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book Not Found"
        });
    };
    return res.status(200).json({
        success: true,
        message: "Book Found By ID",
        data: book
    });
});

router.get("/issued/by-user",(req,res) => {
    const usersWithTheIssuedBook = users.filter((each) => {
        if(each.issuedBook) return each;
    });
    const issuedBooks = [];

    usersWithTheIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.userId = each.id;
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length == 0){
        return res.status(404).json({
            success: false,
            message: "No Books Have Been Issued Yet..!"
        });
    };
    return res.status(200).json({
        success: true,
        message: "Users With The Issued Book...",
        data: issuedBooks
    });
});

router.post("/", (req,res) => {
    const { data } = req.body;
    if(!data){
        res.status(400).json({
            success: false,
            message: "No Data To Add The Book"
        });
    }

    const book = books.find((each) => each.id === data.id);
    if(book){
        return res.status(404).json({
            success: false,
            message: "Id Already Exists !"
        });
    };
    const allBooks = {...books, data};
    return res.status(201).json({
        success: true,
        message: "Book Added Successfully",
        data: allBooks
    });
});

router.put("/:id", (req,res) => {
    const { id } = req.params;
    const { data } = req.body;
    
    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(400).json({
            success: false,
            message: "Book Not Found for Id"
        });
    };
    const updateBookData = books.map((each) => {
        if(each.id === id){
            return {
                ...each,
                ...data
            };
        };
    });
    return res.status(200).json({
        success: true,
        message: "Book Updated !",
        data: updateBookData
    });
});

router.delete("/:id", (req,res) => {
    const { id } = req.params;

    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book Does Not Exists !!"
        });
    }

    const index = books.indexOf(book);
    books.splice(index, 1);

    return res.status(200).json({
        success: true,
        message: "Book is deleted",
        data: books
    });
})

module.exports = router;