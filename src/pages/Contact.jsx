import React from "react";
import * as Form from '@radix-ui/react-form';
// import './Contact.css';

function Contact() {
  return (
    <div id="page-container" class="my-3">
      <h2>Let's Talk!</h2>
      <div class="main">
        <div class="row lightContainer">
          <Form.Root className="FormRoot" action="mailto:peikaimo@gmail.com" method="post">

            <div class="section">
              <Form.Field className="FormField" name="name">
                <Form.Label className="FormLabel">Name</Form.Label>
                <Form.Control class="Input"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                />
              </Form.Field>

              <Form.Field className="FormField" name="email">
                <Form.Label className="FormLabel">Email</Form.Label>
                <Form.Control class="Input"
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </Form.Field>
            </div>

            <div class="section">
              <Form.Field className="FormField" name="message">
                <Form.Control asChild>
                  <textarea className="Textarea" placeholder="What's up?" required />
                </Form.Control>
              </Form.Field>
            </div>

            <div class="section">
              <Form.Submit asChild>
                <button type="submit" className="Button" style={{ marginTop: 10 }}>
                  Send
                </button>
              </Form.Submit>
            </div>
          </Form.Root>

        </div>
      </div>
    </div >
  );
}

export default Contact;
