import React, {useState} from 'react';
import {apiUrl} from '../../constants.ts';
import {postLink} from '../linksThunks.ts';
import {Container, Box, Typography, TextField, Button, CircularProgress, Link} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectLink, selectLinkFetching} from '../linksSlice.ts';

const Home = () => {
  const dispatch = useAppDispatch();
  const link = useAppSelector(selectLink);
  const isLoading = useAppSelector(selectLinkFetching);
  const [form, setForm] = useState({
    originalUrl: '',
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.originalUrl.trim().length > 0) {
      dispatch(postLink(form));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        py={5}
        textAlign="center">
        <Typography
          variant="h4"
          mb={2}>
          Shorten your link!
        </Typography>
        <form
          onSubmit={submitForm}>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter URL"
              name="originalUrl"
              value={form.originalUrl}
              onChange={changeForm}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={form.originalUrl.trim().length === 0}
          >
            Shorten!
          </Button>
        </form>

        <Box mt={4}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            link && (
              <Typography>
                Your link now looks like this: &nbsp;
                <Link href={link.originalUrl}>
                  {apiUrl}{link.shortUrl}
                </Link>
              </Typography>
            )
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;