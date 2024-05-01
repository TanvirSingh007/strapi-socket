<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="submit" class="d-flex flex-column">

                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="Username" name="username"
                                    v-model="form.username" />
                            </div>

                            <div class="mb-3">
                                <input type="email" class="form-control" placeholder="Email Address" name="email"
                                    v-model="form.email" />
                            </div>

                            <div class="mb-3">
                                <input type="password" class="form-control" name="password" v-model="form.password"
                                    placeholder="Password" />
                            </div>

                            <button type="submit" class="btn btn-primary m-1">Create Account</button>

                            <router-link to="/login" class="btn btn-outline-primary m-1">Login</router-link>
                        </form>
                    </div>
                </div>
                <p v-if="showError" id="error" class="text-danger">Could not create an account with the details provided
                </p>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
    name: " RegisterPage",
    data() {
        return {
            form: {
                username: "",
                email: "",
                password: "",
            },
            showError: false
        }
    },
    methods: {
        ...mapActions(["Register"]),
        async submit() {
            try {
                await this.Register({
                    username: this.form.username,
                    password: this.form.password,
                    email: this.form.email,
                });
                this.$router.push("/");

                this.showError = false
            } catch (error) {
                this.showError = true
            }

        }

    }
}
</script>