
                                    // Budget tag selection (scroll-free)
                                    document.querySelectorAll('.budget-tag').forEach(function(tag) {
                                        tag.addEventListener('click', function(e) {
                                            e.preventDefault();
                                            document.getElementById('selectedBudget').value = this.getAttribute('data-value');

                                            document.querySelectorAll('.budget-tag').forEach(function(t) {
                                                t.classList.remove('active');
                                            });
                                            this.classList.add('active');
                                        });
                                    });

                                    // AJAX form submit (no redirect, no popup)
                                    const form = document.getElementById('contactForm');
                                    const result = document.getElementById('formResult');
                                    const submitBtn = document.getElementById('submitBtn');

                                    form.addEventListener('submit', function(e) {
                                        e.preventDefault();

                                        submitBtn.disabled = true;
                                        result.style.color = '';
                                        result.textContent = 'Sending...';

                                        const formData = new FormData(form);

                                        fetch('https://api.web3forms.com/submit', {
                                            method: 'POST',
                                            headers: { 'Accept': 'application/json' },
                                            body: formData
                                        })
                                        .then(async (response) => {
                                            let json = await response.json();
                                            if (response.status == 200) {
                                                result.style.color = 'lightgreen';
                                                result.textContent = 'Form submitted successfully!';
                                                form.reset();
                                            } else {
                                                result.style.color = 'red';
                                                result.textContent = json.message || 'Something went wrong!';
                                            }
                                        })
                                        .catch(() => {
                                            result.style.color = 'red';
                                            result.textContent = 'Something went wrong, please try again!';
                                        })
                                        .finally(() => {
                                            submitBtn.disabled = false;
                                            setTimeout(() => { result.textContent = ''; }, 6000);
                                        });
                                    });
                                    