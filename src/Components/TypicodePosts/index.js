import React, { useState, useEffect, useMemo } from "react";
import { APIServices } from "../../Services/APIServices";
import Grid from "@mui/material/Grid2";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Pagination,
  CardActions,
  IconButton,
  Skeleton,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

const TypicodePostsList = () => {
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const posts = await APIServices.fetchPosts();
      setPosts(posts);
      setLoading(false);
    })();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post?.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const postsToDisplay = useMemo(() => {
    return showFavorites
      ? filteredPosts?.filter((post) => favorites.includes(post.id))
      : filteredPosts;
  }, [filteredPosts, favorites, showFavorites]);

  const paginatedPosts = useMemo(() => {
    return postsToDisplay?.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
    );
  }, [postsToDisplay, currentPage, postsPerPage]);

  const toggleFavorite = (postId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(postId)
        ? prevFavorites?.filter((id) => id !== postId)
        : [...prevFavorites, postId]
    );
  };

  const totalPages = useMemo(() => {
    return Math?.ceil(postsToDisplay.length / postsPerPage);
  }, [postsToDisplay, postsPerPage]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <TextField
          sx={{ width: "40%" }}
          id="outlined-required"
          size="small"
          disabled={loading}
          label="Search posts..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button
          disabled={loading}
          size="small"
          variant="contained"
          onClick={() => {
            setShowFavorites(!showFavorites);
            setCurrentPage(1);
          }}
        >
          {showFavorites ? "Show All Posts" : "Show Favorites"}
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {loading
            ? Array.from({ length: postsPerPage }).map((_, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                  <Card>
                    <CardActions disableSpacing>
                      <Skeleton variant="circular" width={40} height={40} />
                    </CardActions>
                    <CardContent sx={{ height: "200px" }}>
                      <Skeleton variant="text" width="80%" height={30} />
                      <Skeleton variant="text" width="90%" height={20} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : paginatedPosts.map((post) => (
                <Grid key={post?.id} size={{ xs: 2, sm: 4, md: 4 }}>
                  <Card className="card">
                    <CardActions disableSpacing>
                      <IconButton
                        size="large"
                        aria-label="add to favorites"
                        onClick={() => toggleFavorite(post?.id)}
                      >
                        {favorites.includes(post?.id) ? (
                          <StarIcon color="primary" />
                        ) : (
                          <StarOutlineIcon color="primary" />
                        )}
                      </IconButton>
                    </CardActions>
                    <CardContent sx={{ height: "200px", pt: 0, mt: 0 }}>
                      <Typography variant="h5">{post?.title}</Typography>
                      <Typography variant="body2">{post?.body}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>
      {!loading && totalPages > 1 && (
        <Pagination
          sx={{ display: "flex", justifyContent: "right" }}
          showFirstButton
          showLastButton
          variant="outlined"
          shape="rounded"
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      )}
      {!loading && totalPages === 0 && (
        <Typography
          variant="h5"
          align="center"
          component="h1"
          gutterBottom
          sx={{ mt: 15, color: "#808080", fontWeight: "bold" }}
        >
          No posts found....!
        </Typography>
      )}
    </React.Fragment>
  );
};

export default TypicodePostsList;
