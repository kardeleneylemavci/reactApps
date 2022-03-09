import React, {useState} from "react";
//npm install @mui/material @emotion/react @emotion/styled

import { 
    Button, 
    Container, 
    Box, 
    Typography, 
    TextField, 
    CssBaseline, 
    Avatar, 
    Grid, 
    Link,
    createTheme, 
    ThemeProvider,
    FormControlLabel, 
    Checkbox
} from '@mui/material';
//npm i @mui/icons-material --save 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomDiv from "./mylib/mydiv";


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props} className="copyright">
        {'Copyright © '}
        <Link color="inherit" href="https://myalbum.com/">
          Your Site ck ismet değiştirdi
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const theme = createTheme();

export default function Signin() {
    const [email, setEmail]=useState("Kullanıcı");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get("email"));
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CustomDiv text="Giriş Yapın" style={{background:'#ff0000',color:"white"}} inputText={email} />
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
                   {/*  <form onSubmit={handleSubmit}></form> */}
                    <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                       {/*  <input name="email2" required onChange={(e)=>setEmail(e.target.value)}/> */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                       {/*  <label>
                            <input type="checkbox" /> label yazısı
                        </label> */}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
};
