const { test, describe} = require('node:test')
const assert = require('node:assert')
const express =require('express')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})