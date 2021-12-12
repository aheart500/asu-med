import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  link: {
    borderRadius: 5,
    border: "1px solid gray",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
  },
}));
const BooksTabs = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link href="/fekra/bookfair/bookslist">
        <p className={classes.link}>كل الكتب</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/religious">
        <p className={classes.link}>ديني</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/entertainment">
        <p className={classes.link}>ترفيه</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/Educational">
        <p className={classes.link}>تعليمي</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/Children">
        <p className={classes.link}>أطفال</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/Novels">
        <p className={classes.link}>رواية</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/short Stories">
        <p className={classes.link}>قصة قصيرة</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/Self Development">
        <p className={classes.link}>تنيمة بشرية</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/Cultural">
        <p className={classes.link}>ثقافي</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist/unlisted">
        <p className={classes.link}>غير مصنف</p>
      </Link>
      <Link href="/fekra/bookfair/bookslist">
        <p className={classes.link}>كتاب جديد</p>
      </Link>
    </div>
  );
};

export default BooksTabs;
